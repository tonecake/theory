// JavaScript Document

var Scale = function( tonality )
{
    this.tonality = tonality;
    this.tone = tonality.substr(0, tonality.length - 6).toUpperCase();
    this.quality = tonality.substr(tonality.length - 5).toUpperCase();
    this.scale = this.get();
}

Scale.prototype.get = function()
{
}
