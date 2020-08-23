module.exports = function(videolink) {

    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const FFmpeg = require('fluent-ffmpeg');
    FFmpeg.setFfmpegPath(ffmpegPath);
    const path = require('path')
    new FFmpeg({ source: videolink })
        .withNoVideo()
        //.toFormat('wav')
        .withAudioFrequency(16000)
        .withAudioChannels(1)
        .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function() {
            console.log('Processing finished !');
        })
        .saveToFile(path.join('./files/'), path.basename(videolink, path.extname(videolink)) + '.wav');
    
    };