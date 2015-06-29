// JavaScript Document

var Scale = function( tonality )
{
    this.note = tonality.substr(0,1).toUpperCase() + tonality.substr(1, tonality.length-7).toLowerCase();
    this.quality = tonality.substr(tonality.length - 5).toLowerCase();
    this.tonality = this.note + ' ' + this.quality;

    this.type = this.checkTypeOfScale(); // 'b' or '#'
//    this.scale = this.get();
}

Scale.prototype.get = function()
{
}

Scale.prototype.chromatic = function()
{
}

Scale.prototype.checkTypeOfScale = function()
{
    var flatScales = ['F major', 'D minor', 'Bb major', 'G minor',
                      'Eb major', 'C minor', 'Ab major', 'F minor',
                      'Db major', 'Bb minor', 'Gb major', 'Eb minor'];

    for( var i=0; i<flatScales.length; i++ )
    {
        if( this.tonality === flatScales[i] )
        {
            return 'b';
            break;
        }
    }
    return '#';
}
