const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Restaurant = require("../../models/restaurantModel");

exports.searchResturant = catchAsyncErrors(
    async (req, res, next) => {
        const { searchText } = req.params || "";
        const { searchQuery } = req.query || "";
        const  selectedCuisines  = (req.query.selectedCuisines || "").split(",").filter(cuisine => cuisine);
        
        let query = {}

        query.$or = [
            ...(searchText ? [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } }
            ] : []),
            ...(searchQuery ? [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }
            ] : [])
        ];

        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }

        const restaurants = await Restaurant.find(query);

        res.status(200).json({
            success: true,
            restaurants
        })
    }
)