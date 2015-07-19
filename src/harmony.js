// JavaScript Document

var Harmony = function()
{
    if( tonality ) this.set( tonality )
}

Harmony.prototype.set = function()
{
    this.note = tonality.substr(0,1).toUpperCase() + tonality.substr(1, tonality.length-7).toLowerCase();
    this.quality = tonality.substr(tonality.length - 5).toLowerCase();
    this.tonality = this.note + ' ' + this.quality;
}

Harmony.prototype.get = function()
{
    var name = {
        "major" : ['T', 'Sp', 'Dp', 'S', 'D', 'Tp'],
        "minor" : ['t', '...']
    }
}
