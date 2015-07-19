// JavaScript Document

var Scale = function( tonality )
{
    if( tonality ) this.set( tonality )
}

Scale.prototype.set = function( tonality )
{
    this.note = tonality.substr(0,1).toUpperCase() + tonality.substr(1, tonality.length-7).toLowerCase();
    this.quality = tonality.substr(tonality.length - 5).toLowerCase();
    this.tonality = this.note + ' ' + this.quality;
    this.type = this.checkTypeOfScale(); // 'b' or '#'
}

Scale.prototype.get = function()
{
    var scalePreset = {
        "major" : ['M2', 'M2', 'm2', 'M2', 'M2', 'M2', 'm2'],
        "minor" : ['M2', 'm2', 'M2', 'M2', 'm2', 'M2', 'M2'],
    };

    var defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        prime = this.note.substr(0, 1),
        positionOfPrime = defaultScale.indexOf( prime ),

    defaultScale = this.align( defaultScale, positionOfPrime );

    if( this.note.length > 1 ) defaultScale[ defaultScale.indexOf( this.note.substr(0,1) ) ] = this.note;

    for( var i=0; i<defaultScale.length; i++ )
    {
        var pos1 = i,
            pos2 = i+1;

        if( i === 6 ) pos2 = 0;

        var interval = Interval.get(defaultScale[pos1], defaultScale[pos2])
        if( interval.interval != scalePreset[this.quality][i] )
        {
            defaultScale[i+1] = defaultScale[i+1] + this.type;
        }
    }

    return defaultScale;
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

    // if prieme has invaild value on 12 Scale System.
    if( !(this.note in ['E#', 'Fb', 'B#', 'Cb']) )
    {
        switch( this.note )
        {
            case 'E#':
                defaultScale[ defaultScale.indexOf('F') ] = 'E#';
                break;
            case 'Fb':
                defaultScale[ defaultScale.indexOf('E') ] = 'Fb';
                break;
            case 'B#':
                defaultScale[ defaultScale.indexOf('C') ] = 'B#';
                break;
            case 'Cb':
                defaultScale[ defaultScale.indexOf('B') ] = 'Cb';
                break;
        }
    }

    var positionOfPrime = defaultScale.indexOf( this.note );

    return this.align( defaultScale, positionOfPrime );
}

Scale.absolute = Scale.prototype.absolute = function()
{
    var positionOfPrime,
        absolute = [["C", "B#","Dbb"],["C#", "Db", "Bx"],["D", "Cx", "Ebb"],["D#", "Eb", "Fbb"],["E", "Fb", "Dx"],["F", "E#", "Gbb"],["F#", "Gb", "Ex"],["G", "Fx", "Abb"],["G#" ,"Ab"],["A", "Gx", "Bbb"],["A#", "Bb", "Cbb"],["B", "Cb", "Ax"]];

    if( this instanceof Scale )
    {
        var prime = this.chromatic[0]
        for( var i=0; i<absolute.length; i++ )
        {
            for( var j=0; j<absolute[i].length; j++ )
            {
                if(absolute[i][j] === this.note)
                {
                    positionOfPrime = i;
                    break;
                }
            }
        }
    }

    return this.align( absolute, positionOfPrime);
}

Scale.prototype.align = function( scale, index )
{
    var main = scale.slice( index, scale.length ),
        annex = scale.slice( 0, index );

    return main.concat( annex );
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
