let text;
$(document).ready(function(){

$('#submit').on("click",function(){

    $('#sectionResults').html('')
    text = $('#searchForm').val()
    search()
   
})


$('input[type=text]').on('keydown', function(e) {
    if (e.which == 13) {
        e.preventDefault();
        search();
    }
});
})



// function search(){
//     $.get("https://itunes.apple.com/search?term="+text, function(data) {
//         console.log(data);
//         //$('body').append(data);
//         data = JSON.parse(data);
//         console.log(data);
//         data.results.forEach(result =>{
//         $('#sectionResults').append(`<div class="searchResult"><center><a class="trackName">${result.trackName}</a></center> <br><center> <a class="artistName">${result.artistName}, ${result.collectionCensoredName}</a>, </center><br> <center><img src="${result.artworkUrl100}"></img></center> <br> <center><audio controls>
//         <source src="${result.previewUrl}" type="audio/aac">
//          </audio></center></div>`)

//         });
//     });
// }



function search(){

    $.get("https://itunes.apple.com/search?term="+text, function(data) {
        console.log(data);
        //$('body').append(data);
        data = JSON.parse(data);
        console.log(data);
        var track, artist, album;
        data.results.forEach(result =>{
            if(result.wrapperType == 'track' && result.kind == 'song'){
            if(result.trackName != undefined){
                track = result.trackName.slice(0,25)
            }else track = '';
            if(result.artistName != undefined){
                artist = result.artistName.slice(0,20)
            }else artist = '';
            if(result.collectionCensoredName != undefined){
                album = result.collectionCensoredName.slice(0,20)
            }else album = '';

        $('#sectionResults').append(`<div class="searchResult"><center><a class="trackName">${track}</a></center> <br><center> <a class="artistName"><b>${artist}</b>, ${album}</a> </center><br> <center><img src="${result.artworkUrl100}"></img></center> <br> <center><audio controls>
        <source src="${result.previewUrl}" type="audio/aac">
         </audio></center></div>`)
        
        }
        });
        if(data.resultCount == 0){
            $('#sectionResults').append("<h2>No result for '"+text+"'</h2>")
        }
        
    });

}