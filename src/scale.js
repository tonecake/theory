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
    var fifth = ['F', 'C', 'G', 'D', 'A', 'E', 'B'],
        defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        prime = this.note.substr(0, 1),
        positionOfPrime = defaultScale.indexOf( prime ),
        mainScale = defaultScale.slice( positionOfPrime, defaultScale.length ),
        annexScale = defaultScale.slice( 0, positionOfPrime );

    defaultScale = mainScale.concat( annexScale );
    console.log(defaultScale);

    if( this.type === 'b' ) fifth = fifth.reverse();

    // 이어서 완성하기.

}

Scale.prototype.chromatic = function()
{
    var defaultScale;

    if( this.type === '#' )
    {
        defaultScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    }
    else
    {
        defaultScale = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
    }

    var positionOfPrime = defaultScale.indexOf( this.note ),

        mainScale = defaultScale.slice( positionOfPrime, defaultScale.length ),
        annexScale = defaultScale.slice( 0, positionOfPrime );

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
