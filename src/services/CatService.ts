
class CatService {
    static async getCatFact() {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        return data.fact;
    };
}

export default CatService;