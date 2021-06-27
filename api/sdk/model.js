const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    m = (data[1]) 
    r = (data[2])
    s = (data[3])
    return [x, y, z]
}

async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Afaizin-bitt/JST_Kisi-kisi-UAS/main/api/sdk/model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return normalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
