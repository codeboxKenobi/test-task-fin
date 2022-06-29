export let userItems = [];

// уникальные значения
export function unique( arr ) {
    const result = [];

    for ( const str of arr ) {
        if ( !result.includes( str ) ) {
            result.push( str );
        }
    }
    return result;
}

// массив уникальных ID
export function getUniqueIds( arr, savePoint ) {
    return savePoint.push( unique( arr.map( item => item.userId ) ) );
}
// Разделить на массивы  пo ID
export function splitUsers( arr, iterator ) {
    const dta = [];
    for ( let x = 0; x < iterator[ 0 ].length; x++ ) {
        dta.push( arr.filter( item => item.userId === iterator[ 0 ][ x ] ) );
    }
    mergeCompleted( dta );
    return dta;
}

// Кoнструктoр
export class FullUser {
    constructor( id, completedTrue, completedFalse, titles, ids ) {
        this.id = id;
        this.completedTrue = completedTrue;
        this.completedFalse = completedFalse;
        this.titles = titles;
        this.ids = ids
    }
}
// sorter
export function compare( field, order ) {
    let len = arguments.length;
    if( len === 0 ) {
        return ( a, b ) => ( a < b && -1 ) || (a > b && 1) || 0;
    }
    if(len === 1) {
        switch(typeof field) {
            case 'number':
                return field < 0 ?
                    ((a, b) => (a < b && 1) || (a > b && -1) || 0) :
                    ((a, b) => (a < b && -1) || (a > b && 1) || 0);
            case 'string':
                return (a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
        }
    }
    if (len === 2 && typeof order === 'number') {
        return order < 0 ?
            ((a, b) => (a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0) :
            ((a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0);
    }
    let fields, orders;
    if (typeof field === 'object') {
        fields = Object.getOwnPropertyNames(field);
        orders = fields.map(key => field[key]);
        len = fields.length;
    } else {
        fields = new Array(len);
        orders = new Array(len);
        for(let i = len; i--;) {
            fields[i] = arguments[i];
            orders[i] = 1;
        }
    }
    return (a, b) => {
        for(let i = 0; i < len; i++) {
            if(a[fields[i]] < b[fields[i]]) return orders[i];
            if(a[fields[i]] > b[fields[i]]) return -orders[i];
        }
        return 0;
    };
}

// Сбoрка USER
export function mergeCompleted( arr ) {

    let tmp = [];

    let xId = null;
    let xCompTrue = 0;
    let xCompFalse = 0;
    let xTitle = [];
    let ids = null
    
    for ( let i = 0; i < arr.length; i++ ) {
        for ( let m = 0; m < arr[ i ].length; m++ ) {
            xId = arr[ i ][ m ].userId;

            if ( arr[ i ][ m ].userId ) {
            
                if ( arr[ i ][ m ].completed === true ) {
                    xCompTrue += 1;
                }
                else if ( arr[ i ][ m ].completed === false ) {
                    xCompFalse += 1;
                }

                if ( arr[ i ][ m ].title !== '' ) {
                    xTitle.push( arr[ i ][ m ].title )
                }

                if ( arr[ i ][ m ].id !== null || '' ) {
                    ids = arr[ i ][ m ].id
                }
            }
        }

        const userItem = new FullUser( xId, xCompTrue, xCompFalse, xTitle, ids )
        tmp.push( userItem  )

        xId = null;
        xCompTrue = 0;
        xCompFalse = 0;
        xTitle = [];
    }
    tmp.sort(compare( 'completedTrue' ))

    userItems = tmp;
}
