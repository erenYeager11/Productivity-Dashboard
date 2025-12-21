function openFullPages() {
    //document.querySelectorAll('.allElems')--  this will select all the elements with same classes
const allElems = document.querySelectorAll('.elems')
const fullElemsPage = document.querySelectorAll('.fullElems')
const fullElemsPageBackBtn = document.querySelectorAll('.fullElems .back')

//Full Activity Page Open logic
allElems.forEach(function(elem){
    elem.addEventListener('click',function(){
        fullElemsPage[elem.id].style.display = 'block'
    })
})

//Full Activity Page Back Button logic
fullElemsPageBackBtn.forEach(function(back){
    back.addEventListener('click',function(){
        fullElemsPage[back.id].style.display = 'none'
    })
})
}
openFullPages()