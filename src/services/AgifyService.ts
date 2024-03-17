class AgifyService {
    static async getAge(name: string, signal?: AbortSignal): Promise<number | null> {
        const options = signal ? { signal } : {};

        try {
            const response = await fetch(`https://api.agify.io/?name=${name}`, options);
            const data = await response.json();
            return data.age;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Запрос отменен');
            } else {
                console.error('Произошла ошибка при выполнении запроса:', error);
            }
            return null;
        }
    };
}

export default AgifyService;
