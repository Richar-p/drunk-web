var element = null;
var walker = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
while(element=walker.nextNode()){
	element.textContent = element.textContent.replace('j','s').replace('J','S');
}