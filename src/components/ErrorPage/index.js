const ErrorPage = () => {
    function reload() {
        window.location.reload();
    }

    return (
        <div id="error-page">
            <div>
                <p>
                    Ops... Algo de errado aconteceu. <br />
                    Por favor, recarregue a página. <br />
                    Se o erro persistir, tente novamente mais tarde.
                </p>
                <button
                    type="button"
                    onClick={reload}
                >
                    Recarregar
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
