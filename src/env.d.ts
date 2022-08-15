

declare module "*.vue" {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare global {
    interface ResponseSuccess<T = {}> {
        code: number;
        message: string;
        result: { access_token: string };
        detail: { message: string };
    }

    interface IPagination<T> {
        code: number;
        message: string;
        result: { skip: number, limit: number, total: number, data: T[] };
        detail: T;
    }

    interface ImgInterface<T> {
        code: number;
        img: string
    }

    interface FishInterfasce<T> {
        code: number;
        message: string;
        result: {
            title: string;
            today: {
                gregorian: string;
                lunar: string;
                week: string;
                constellations: string;
                season: string;
                Solar: string;
                festivals: string;
                three_volts_count_nine: string;
                suitable: string;
                taboo: string;
            };
            holiday: {
                weekend: string;
                new_year_day: string;
                spring_festival: string;
                tomb_sweeping: string;
                labour_day: string;
                dragon_boat: string;
                national: string;
                autumn: string;
            };
        }
    }

    interface AgeInterface<T> {
        code: number;
        message: string;
        result: {
            title: string;
            pass_by: string;
            born_in: string;
            so: {
                eighty: string;
                fifty: string;
                hundred: string;
                seventy: string;
                sixty: string;
            };
        };
        detail: T;
    }
}
export { };