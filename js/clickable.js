function checkclick(event){
	var search = document.getElementById('chatsettings');
	var searchres = document.getElementById('chatoptions');
	if(event.target.id != search.id){
		searchres.classList.remove('sho');
	}
}
