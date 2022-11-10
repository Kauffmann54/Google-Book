export class HomeCategoryModel {
    title: string;
    image: string;
    type: string;

    constructor(title: string, image: string, type: string) {
        this.title = title;
        this.image = image;
        this.type = type;
    }
}