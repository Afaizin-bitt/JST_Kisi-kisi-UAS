const tf = require('@tensorflow/tfjs-node');

function input(data){ // i & r
    a = (data[1]) 
    b = (data[2])
    c = (data[3])
    return [a, b, c]
}

function output(data){
    d = (data[4])
    e = (data[5])
    f = (data[6])
    return [d, e, f]
}


async function predict(data){
    let in_dim = 3;
    
    data = input(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Afaizin-bitt/JST_Kisi-kisi-UAS/main/public/Ex-Model/model.jsonhttps://raw.githubusercontent.com/Afaizin-bitt/JST_Kisi-kisi-UAS/main/public/Ex-Model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return output( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
