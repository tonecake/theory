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
    var normalScale;

    if( this.type === '#' )
    {
        normalScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    }
    else
    {
        normalScale = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
    }

    var primePosition = normalScale.indexOf( this.note ),

        mainScale = normalScale.slice( primePosition, normalScale.length ),
        annexScale = normalScale.slice( 0, primePosition );

    return mainScale.concat( annexScale );
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
