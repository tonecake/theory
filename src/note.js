// JavaScript Document

var Note = function( note )
{
    if( note ) this.set( note );
}

Note.prototype.set = function( string )
{
    var octave;
    if( (string.substring(string.length-1,string.length) in [,'1','2','3','4','5','6','7','8','9']) )
    {
        octave = parseInt( string.substring(string.length-1,string.length) );
        string = string.substring(0,string.length-1);
    }
    else
    {
        octave = 4; // default
    }

    this.note = string.substr(0,1).toUpperCase() + string.substr(1).toLowerCase();
    this.octave = octave;
}

Note.prototype.toNumber = function()
{
    var scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        scaleIndex = [0, 2, 4, 5, 7, 9, 11],
        accidentals = ['bbb', 'bb', 'b', '', '#', 'x', '#x'];

    var note = this.note.substr(0,1),
        accidental = this.note.substr(1);

    return adjustNoteNumber( scaleIndex[ scale.indexOf( note ) ] + ( accidentals.indexOf( accidental ) - 3 ) );

    // 나중에 이것만 따로 독립시키는걸 고려해보도록 한다.
    function adjustNoteNumber( num )
    {
        if( num > 23 )
        {
            return num - 24;
        }
        else if( num < 24 && num > 11 )
        {
            return num - 12;
        }
        else if( num < 0 )
        {
            return num + 12;
        }
        else
        {
            return num;
        }
    }
}

Note.prototype.accidentalize = function( adjust )
{
    var accidentals = ['bbb', 'bb', 'b', '', '#', 'x', '#x'];

    var note = this.note.substr(0,1),
        accidental = this.note.substr(1);

    for( var i=0; i<accidentals.length; i++ )
    {
        if( accidental === accidentals[i] )
        {
            accidental = accidentals[ i + adjust ];

            this.note = note + accidental;
            break;
        }
    }
}
