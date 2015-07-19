// JavaScript Document

var Chord = function( tonality )
{
    if( tonality ) this.set( tonality )
}

Chord.prototype.set = function( tonality )
{
    this.note = tonality.substr(0,1).toUpperCase() + tonality.substr(1, tonality.length-7).toLowerCase();
    this.quality = tonality.substr(tonality.length - 5).toLowerCase();
    this.tonality = this.note + ' ' + this.quality;
}

Chord.prototype.get = function()
{
}
