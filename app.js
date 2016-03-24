var cheerio = require('cheerio'); 
var request = require('request');
// var fs = require('fs');
// GDFR Flo rida
// Aura Dione, Before the

function get_flag_value (flag) {
     var index = process.argv.indexOf(flag);
        return (index == -1) ? null : process.argv[index + 1];
};

var YOU_TUBE_SEARCH = "https://www.youtube.com/results?q=";


var youtube_link = get_flag_value('--link');
var youtube_title = get_flag_value('--title');

var watch_title = null;
if(youtube_link) {
	watch_title = youtube_link.substr(youtube_link.indexOf('?v') + 1);
	get_video_info();
}

if(youtube_title) {
	get_search_list();
}

var search_result = {};
search_result.videos = [];
search_result.channels = [];
search_result.playlists = [];
search_result.movies = [];
search_result.shows = [];

function youtube_search(watch_title, callback) {
	request(YOU_TUBE_SEARCH + watch_title, callback);
}

// this hack rarely not works
function fix_like_dislike_issue(x) {  
	var val = parseFloat(x.replace(/,/g,''));
	val--;
    return addCommas(val);
}

// code snippet from : http://stackoverflow.com/a/3753507/1481716
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


function get_search_list() {
	// according to the filters titles youtube_title should be change
	youtube_search(youtube_title, function(error, response, html) {
		// playlist
		
	});
}

function get_channel_info() {}
function get_playlist_info() {}



function get_video_info() {
	request(youtube_link, function(error, response, html) {
		var $ = cheerio.load(html);
		_title = $('title').text();
		_description = $('#eow-description').text();
		_url = $('#watch7-content link').attr('href');
		_author = $('.yt-user-info a').text();
		_user = $('#watch7-user-header a')[0].attribs.href;
		_name = $('title').text();
		_view_count = $('#watch7-views-info .watch-view-count').text();
		_likes = fix_like_dislike_issue($('span .like-button-renderer-like-button span')[1].children[0].data);
		_dis_likes = fix_like_dislike_issue($('span .like-button-renderer-dislike-button span')[1].children[0].data);
		_thumbnail = $('#watch7-content link')[3].attribs.href;
		_is_family_friendly =  $('#watch7-content meta')[12].attribs.content;
		_regions_allowed = $('#watch7-content meta')[13].attribs.content;
		_date_published = $('#watch7-content meta')[15].attribs.content;
		_genre = $('#watch7-content meta')[16].attribs.content;

		youtube_search(watch_title, function(e, r, h) {
			_$ = cheerio.load(h);
			_duration = _$('.item-section li .video-time')[0].children[0].data;
			print_all();
		});

		
		function print_all() {
			console.log("Title: " + _title);
			console.log("Description: " + _description);
			console.log("URL: " + _url);
			console.log("Author: " + _author);
			console.log("User: " + _user);
			console.log("Durations: " + _duration);
			console.log("Name: " + _name);
			console.log("Views: " + _view_count);
			console.log("Likes: " + _likes);
			console.log("Dislikes: " + _dis_likes);
			console.log("Family Friendly: " + _is_family_friendly);
			console.log("Thumbnail: " + _thumbnail);
			// console.log("Allowed Regions: " + _regions_allowed);
			console.log("Date Published: " + _date_published);
			console.log("Genre: " + _genre);
		}
	});
}




