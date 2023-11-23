//Criando uma stream do zero
import { Readable, Writable, Transform } from 'node:stream'

//Stream de leitura
class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        //Quando envia null a stream deve parar
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    }, 1000)
  }
}

//Transform Stream
class NegativeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

//Stream de escrita
class MultiplyByTenStream extends Writable {
  /**
   * chunk é pedaço do dado.
   * encoding é como o dado está codificado.
   * callback é função que será chamada quando a stream
   * terminou de processar a informação.
   */
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

//new OneToHundredStream().pipe(process.stdout)
//new OneToHundredStream().pipe(new MultiplyByTenStream())
new OneToHundredStream()
  .pipe(new NegativeNumberStream())
  .pipe(new MultiplyByTenStream())
