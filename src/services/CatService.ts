
function CatService() {
    const getCatFact = async () => {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        return data.fact;
    };


    return {
        getCatFact
    }
}

export default CatService()