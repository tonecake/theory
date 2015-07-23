// JavaScript Document

var Interval = function( interval )
{
    this.interval;
    this.space;
    this.alteration;

    if( interval ) this.set( interval );
}

Interval.prototype.set = function( interval )
{
    this.interval = interval;
    this.space = parseInt( interval.substr(interval.length - 1, interval.length) );
    this.alteration = interval.substr(0, 1);
}

Interval.get = Interval.prototype.get = function( index, destination )
{
    if( !(index instanceof Note) || !(destination instanceof Note) )
    {
        index = new Note( index );
        destination = new Note( destination );
    }

    var scale = new Scale(index.note + ' major').absolute(),
        semitone;

    for( i=0; i<scale.length; i++ )
    {
        for( j=0; j<scale[i].length; j++ )
        {
            if( scale[i][j] === destination.note )
            {
                semitone = i; // +1
                break;
            }
        }
    }

    var space,
        semitoneIndex = [0, 2, 4, 5, 7, 9, 11],
        defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

    defaultScale = new Scale().align( defaultScale, defaultScale.indexOf(index.note.substr(0,1)) );
    space = defaultScale.indexOf(destination.note.substr(0,1)); // +1

    var alteration;

    if( space === 0 || space === 3 || space === 4 || space === 7 )
    {
        var alterations = ['ddd', 'dd', 'd', 'P', 'A', 'AA', 'AAA'];
        alteration = alterations[ semitone - semitoneIndex[space] + 3 ];
    }
    else if( space === 1 || space === 2 || space === 5 || space === 6 )
    {
        var alterations = ['ddd', 'dd', 'd', 'm', 'M', 'A', 'AA', 'AAA'];
        alteration = alterations[ semitone - semitoneIndex[space] + 4 ];
    }

    var result = alteration + (space + 1)
//    console.log(space, semitone, semitoneIndex[space], alteration); // debug script

    if( this instanceof Interval )
    {
        this.set(result);
    }
    else
    {
        return new Interval(result);
    }
}

// return Note context
Interval.prototype.from = function( index, direction )
{
    var scale = new Scale(index + ' major').chromatic(),
        note = scale[this.getSemitoneBySpace(this.interval)];

    var ctx = new Note( note );
    ctx.accidentalize( this.getSemitone() - this.getSemitoneBySpace() );

    return ctx;
}

Interval.prototype.raise = function( repeat )
{
    if( !repeat ) repeat = 1;

    for( var i=0; i<repeat; i++ )
    {
        this.set( this.alteration + ( this.space + 7 ) );
    }
}

Interval.prototype.reduce = function( repeat )
{
    if( !repeat ) repeat = 1;

    for( var i=0; i<repeat; i++ )
    {
        if( this.space < 7 )
        {
            return false;
            break;
        }

        this.set( this.alteration + ( this.space - 7 ) );
    }
}

Interval.prototype.simple = function()
{
    this.set( this.alteration + ( this.space - ( Math.floor( this.space / 7 ) * 7 ) ) );
}

Interval.prototype.reverse = function()
{
    var result, space = [ 8, 7, 6, 5, 4, 3, 2, 1 ],
        alterations = ['ddd', 'dd', 'd', 'x', 'A', 'AA', 'AAA'],
        alterationsReverse = [ "AAA", "AA", "A", "x", "d", "dd", "ddd" ];

    if( this.alteration === 'P' )
    {
        this.set( 'P' + space[ this.space - 1 ] );
    }
    else if( this.alteration === 'm' || this.alteration === 'M' )
    {
        if( this.alteration === 'm' )
        {
            this.set( 'M' + space[ this.space - 1 ] );
        }
        else if( this.alteration === 'M' )
        {
            this.set( 'm' + space[ this.space - 1 ] );
        }
    }
    else
    {
        for( var i=0; i<alterations.length; i++ )
        {
            if( this.alteration === alterations[i] )
            {
                this.set( alterationsReverse[i] + space [ this.space - 1 ] );
            }
        }
    }
}

Interval.prototype.getSemitone = function()
{
    var alteration, alterations,
        octave = Math.floor( this.space / 7 ),
        semitone = [0, 2, 4, 5, 7, 9, 11],
        interval = new Interval( this.interval );

    interval.simple();

    if( interval.space === 1 || interval.space === 4 || interval.space === 5 || interval.space === 8 )
    {
        alterations = ['dd', 'd', 'P', 'A', 'AA'];
        alteration = alterations.indexOf( interval.alteration ) - 2;
    }
    else if(interval.space === 2 || interval.space === 3 || interval.space === 6 || interval.space === 7 )
    {
        alterations = ['dd', 'd', 'm', 'M', 'A', 'AA'];
        alteration = alterations.indexOf( interval.alteration ) - 3
    }

    return ( semitone[ interval.space - 1 ] + alteration ) + ( 12 * octave );
}

Interval.prototype.getSemitoneBySpace = function()
{
    var semitone = [0, 2, 4, 5, 7, 9, 11],
        interval = new Interval( this.interval );

    return semitone[ interval.space - 1 ];
}
