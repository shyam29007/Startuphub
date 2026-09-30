 export default class CategoryModel {
    constructor(
        id = "",
        categoryName = "",
        description = "",
        status = true,
        createdAt = null
    )
    {
        this.id = id;
        this.categoryName = categoryName;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
    }
}

