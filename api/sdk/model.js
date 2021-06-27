const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    x = (data[0]) 
    y = (data[1])
    z = (data[2])
    return [x, y, z]
}
function denormalized(data){ // i & r
    m = (data[0]) 
    r = (data[1])
    s = (data[2])
    return [m, r, s]
}


async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Afaizin-bitt/JST_Kisi-kisi-UAS/main/public/Ex-Model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
