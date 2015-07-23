// JavaScript Document

var Chord = function( symbol )
{
    if( symbol ) this.set( symbol )
}

Chord.prototype.set = function( symbol )
{
    this.note = tonality.substr(0,1).toUpperCase() + tonality.substr(1, tonality.length-7).toLowerCase();
    this.quality = tonality.substr(tonality.length - 5).toLowerCase();
    this.tonality = this.note + ' ' + this.quality;
}

Chord.prototype.get = function( symbol )
{
    var rule = {
        major : [0, 0, 0, 0],
        dominant : [0, 0, 0, -1],
        minor : [0, -1, 0, 0],
        diminished : [0, -1, -1, -2],
        augmented : [0, 0, 1, -1]
    };
}
