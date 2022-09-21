import BallSVG from '../../../assets/svg/ball.svg';

const Loading = () => {
    return (
        <div id="loading-screen">
            <div>
                <img
                    src={BallSVG}
                    id="loading-img"
                    alt=""
                />
                <span>Carregando...</span>
            </div>
        </div>
    );
};

export default Loading;
