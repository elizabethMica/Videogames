export default function Validation(input){
    let errors={}
//name
    if(!input.name){errors.name = "Your game needs a name"};
    if(input.name.length > 30){errors.name = "The name has to be under 30 characters"};
    if(input.name.length < 4){errors.name = "The name has to be over 5 characters"};
    if(!(/^[a-zA-Z0-9\s]+$/).test(input.name)){errors.name = "Special characters are not allowed"};

//description
    if(!input.description){errors.description = "We need to know what your game is about"};
    if(input.description.length < 10){errors.description = "Tell us more!"};
    // if(!(`^[a-zA-Z0-9\s,()"'\n!?]+$`).test(input.description)){errors.description = "Special characters are not allowed"};

//platforms
    if(input.platforms.length === 0){errors.platforms= "Choose at least one platform"};

    
//released
    if(!input.released){errors.released = "Your game needs a release date"};
    
//rating
    if(!input.rating){errors.rating = "Rate your game!"};
    if(input.rating <= 0){errors.rating = "You can't rate your game with '0'"};
    if(input.rating > 5){errors.rating = "Can only be rated from '1' to '5'"}

//genres
    if(input.genres.length === 0){errors.genres= "Choose at least one genre"};
    

    return errors;
};