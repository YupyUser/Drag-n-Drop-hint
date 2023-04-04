
// finding blocks
let block1 = document.querySelector('.block1');
let block2 = document.querySelector('.block2');
let block3 = document.querySelector('.block3');
let blockArr = [block1,block2,block3];


// finding areas
let block_form1 = document.querySelector('.block_form1');
let block_form2 = document.querySelector('.block_form2');
let block_form3 = document.querySelector('.block_form3');
let formArr = [block_form1,block_form2,block_form3];


// finding paragraphs
let textArr = document.querySelectorAll('p');


function moveAt (block, event) {
    block.style.top = event.pageY - block.offsetWidth / 2 + "px";
    block.style.left = event.pageX - block.offsetWidth / 2 + "px";
}

// move blocks
function moveBlock (event,elem) {

    // adding position absolute and moving to same cords
    elem.style.position = 'absolute';
    moveAt(elem,event);

    // moving on screen
    document.onmousemove = (event) => moveAt(elem,event);

    // catching mouse up
    elem.onmouseup = () => {
        document.onmousemove = null;
        this.onmouseup = null;
        }

    // turning off browser Drag'N'Drop
    elem.ondragstart = function() {
    return false;
  };
}


// setting the function to block
block1.onmousedown = (event) => moveBlock(event,block1);
block2.onmousedown = (event) => moveBlock(event,block2);
block3.onmousedown = (event) => moveBlock(event,block3);




function bindingAreaToBlock (blockArr,areaArr,textArr) {

    // counting true results
    let count = 0;

    // checking each element on true condition
    for (let i=0;i<blockArr.length;i++) {

        // setting condition
        if (
            ((blockArr[i].getBoundingClientRect().top >= areaArr[i].getBoundingClientRect().top) && (blockArr[i].getBoundingClientRect().left >= areaArr[i].getBoundingClientRect().left))
            && ((blockArr[i].getBoundingClientRect().bottom <= areaArr[i].getBoundingClientRect().bottom) && (blockArr[i].getBoundingClientRect().right <= areaArr[i].getBoundingClientRect().right))
            ) {
                // setting classes
                areaArr[i].classList.add('blockIn');
                blockArr[i].classList.add('innerBlock');
                textArr[i].classList.add('hidden');

                // adding block to frame (form)
                areaArr[i].append(blockArr[i]);
                

                // setting position of block in frame (form)
                blockArr[i].style.position = 'relative';
                blockArr[i].style.top = (areaArr[i].getBoundingClientRect().height / 2) - (blockArr[i].getBoundingClientRect().height / 2) - 5 + 'px';
                blockArr[i].style.left = (areaArr[i].getBoundingClientRect().width / 2) - (blockArr[i].getBoundingClientRect().width / 2) - 5 + 'px';
                
                // canceling movement of block
                blockArr[i].onmousedown = null;
                
                count++;

            } else console.log("blocks isn't at right place!");
            
    }

    // condition about animation
    if (count==3) {
        document.querySelector('.result').classList.add('congr');
        document.querySelector('.result').innerHTML = 'Congratulations!!!';
    }
}

// interval of checking position of blocks
setInterval(bindingAreaToBlock,2000,blockArr,formArr,textArr);



