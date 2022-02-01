
const VideoPlayer = (props) => {

    const { url, image } = props

    const stopVideo = (e) => {
        e.target.pause();
    }
    
    const playVideo = (e) => {
        e.target.play();
    }

    return (
        <video 
            onMouseOver={(e) => playVideo(e)}
            onMouseOut={(e) => stopVideo(e)}
            style={{objectFit: 'cover', height: '100%', width: '100%'}}
            src={url}
            // poster={image}
            // playsInline={true}
            // autoPlay={true}
            muted={true}
            loop
        />
    )
}

export default VideoPlayer;