const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        const frame = {
            currentIndex: 0,
            maxIndex: 693
        };
        let imagesLoaded = 0;
        const images = [];

        function preloadImages(){

            for ( var i=1 ; i<=frame.maxIndex; i++ ){
                const ImageUrl = `./video-frames/frame_${i.toString().padStart(4, "0")}.jpeg`
                const img = new Image();
                img.src = ImageUrl;
                img.onload = ()=> {
                    imagesLoaded++;
                    if ( imagesLoaded === frame.maxIndex){
                        loadImage( frame.currentIndex);
                        startAnimation();
                    }
                }
                images.push(img);
            }
        }
        
        function loadImage(index){
            if (index >=0 && index <= frame.maxIndex){
                const img = images[index];

                canvas.width = window.innerWidth;
                canvas.height= window.innerHeight;

                const scaleX = canvas.width /img.width;
                const scaleY = canvas.height/ img.height;
                const scale = Math.max(scaleX, scaleY);

                const newWidth = img.width * scale;
                const newHeight = img.height * scale;

                const offsetX = (canvas.width - newWidth)/2;
                const offsetY = (canvas.height - newHeight)/2;

                context.clearRect(0,0, canvas.width, canvas.height);
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = "high";
                context.drawImage(img, offsetX, offsetY , newWidth , newHeight);

                frame.currentIndex = index;



            }
        }
        
        function startAnimation(){
            var tl = gsap.timeline({
                scrollTrigger:{
                    trigger : ".parent",
                    start : " top top",
                    scrub : 2
                }
            })
            tl.to(frame, {
                currentIndex: frame.maxIndex,
                onUpdate: function() {
                    loadImage(Math.floor(frame.currentIndex))
                }
            })
        }
        preloadImages();
