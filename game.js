class MatchGame {
    constructor(picFilename,numBoxes,box){
    
        this.picFilename=picFilename;
        this.pic = [];
        this.numBoxes=numBoxes;
        this.halfNumBoxes=numBoxes/2;
        this.clickcounter=0;
        this.firstflip=null;
        this.secondflip=null;
        this.box=box;

        this.turn=0;
        this.match=0;


    }

gameStart(){

this.createPic(this.picFilename);
this.shufflePictures();
this.addPictures(this.pic,this.numBoxes);
this.matchFlip();
this.backHome();
this.restart();
}

createPic(picFilename){

    for(let i = 1; i <= this.halfNumBoxes; i++){
        if(i < 10){			
            this.pic.push(picFilename + '0' + i + '.png');
            this.pic.push(picFilename + '0' + i + '.png');

        }else{
            this.pic.push(picFilename + i + '.png');
            this.pic.push(picFilename + i + '.png');

        }


}
}
shufflePictures(){

    let counter = this.pic.length;
    let temp; 
    let i;

    // While there are elements in the array
    while (counter > 0) {

        // Pick a random index
        i = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = this.pic[counter];
        this.pic[counter] = this.pic[i];
        this.pic[i] = temp;

    } // end while

}

addPictures(pic,numBoxes){
    let $theBox="";
    for(let i=1;i<=numBoxes;i++){
    const $theImg=$('<img>').attr('src', pic[i-1]);
    if(i<10){
   $theBox = $(`.box0${i} .face`);
    }else{

    $theBox = $(`.box${i} .face`);
    }	
    $theImg.appendTo($theBox);

    }
}


matchFlip(){
let hpwidth=100;
 const that=this;
 that.box.click(function(){
        that.clickcounter++;
        if(that.clickcounter==1){
            $(this).find('.back').fadeOut();
            $(this).find('.face').fadeIn();
            $(this).find('.face').addClass('flipped');
            that.firstflip = $(this).find('.face img').attr('src');
            $(this).css('pointer-events','none');
        }
        if(that.clickcounter==2){
            $(this).find('.back').fadeOut();
            $(this).find('.face').fadeIn();
            $(this).find('.face').addClass('flipped');
            that.secondflip = $(this).find('.face img').attr('src');
            $('.box').css('pointer-events','auto');
         if(that.firstflip==that.secondflip){

                setTimeout(function(){
                    $('.flipped').closest('.box').css('visibility','hidden');
                },550);
                that.clickcounter=0;
               that.firstflip==null;
               that.secondflip==null;
               that.turn++;
               $('.turnvalue').html(that.turn);
               that.match++;
               $('.matchvalue').html(that.match);
               if(that.match===that.halfNumBoxes){
                $('.confirm-cover').fadeIn();
                $('.confirm-box h1').html('YOU WIN !');
            }

    }else{
        if(hpwidth<=50){

            $('.w3-green').removeClass('.w3-green').addClass('w3-red');

        }
        hpwidth=hpwidth-20; 
        $('.w3-green').css('width',(hpwidth).toString()+'%');
        $('.hp').html(hpwidth+'%');
               that.firstflip==null;
             that.secondflip==null;
              that.clickcounter=0;
              that.turn++;
            
              $('.turnvalue').html(that.turn);
            setTimeout(function(){
             $('.flipped').fadeOut().removeClass('flipped');
             $('.back').fadeIn();

            },550);
            if(hpwidth<=0){
                $('.confirm-cover').fadeIn();
                $('.confirm-box h1').html('YOU LOST !');
         }
    
            }

        }
    });
   
}

backHome(){
    $('.home-button ').click(function(){

        $('.cover').fadeOut('slow');
    });

    $('.restart').click(function(){

        $('.cover').fadeIn('slow');
        $('.confirm-cover').hide();
        location.reload();
        
    });
}





}




const mg=new MatchGame('images/card',12,$('.box'));

mg.gameStart();
