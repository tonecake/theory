// JavaScript Document

var Interval = function( interval )
{
    this.note;

    this.set( interval );
}

Interval.prototype.get = function()
{
}

Interval.prototype.set = function( interval )
{
    this.interval = interval;
    this.space = parseInt( interval.substr(1, interval.length) );
    this.alteration = interval.substr(0, 1);
}

Interval.prototype.raise = function()
{
    this.set( this.alteration + ( this.space + 7 ) );
}

Interval.prototype.reduce = function()
{
    if( this.space < 7 )
    {
        return false;
    }

    this.set( this.alteration + ( this.space - 7 ) );
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
