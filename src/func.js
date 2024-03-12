export function TypeOfSort(typeSort){
    return function(a, b){
        switch (typeSort){
            case "nameAZ":
                return ('' + a.name).localeCompare(b.name);
            case "nameZA":
                return ('' + b.name).localeCompare(a.name);
            case "openOC":
                return (a.closed === b.closed)? 0 : a.closed? -1 : 1;
            case "openCO":
                return (b.closed === a.closed)? 0 : b.closed? -1 : 1;
            case "memberUp":
                return a.members_count - b.members_count
            case "memberDo":
                return b.members_count - a.members_count
            case "friendUp":
                return  a.friends && b.friends? a.friends.length - b.friends.length: a.friends? -1:1
            case "friendDo":
                return  a.friends && b.friends? b.friends.length - a.friends.length: b.friends? -1:1
            default:
                return 0
        }
    };

}