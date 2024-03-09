
class AgifyService {
    static async getAge(name: string): Promise<number | null> {
        const response = await fetch(`https://api.agify.io/?name=${name}`);
        const data = await response.json();
        return data.age;
    };
}

export default AgifyService