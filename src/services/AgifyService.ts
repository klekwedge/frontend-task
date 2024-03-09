
function AgifyService() {
    const getAge = async (name: string) => {
        const response = await fetch(`https://api.agify.io/?name=${name}`);
        const data = await response.json();
        return data.age;
    };

    return {
        getAge
    }
}

export default AgifyService()