import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}
  async getShopeeProducts() {
    const cookieStr = 'SPC_F=fT78PW05Bn84uZTYPwN20DLugwhn3Be5; SC_DFP=GaBPkp1dtaNDKQPe82LvRqx9mlhN9hbP; ' +
      '_gcl_au=1.1.1607562020.1552016994; _fbp=fb.1.1552016994677.1390032690; _ga=GA1.3.2098735566.1552017011; ' +
      '_ga=GA1.2.671433057.1552274818; cto_lwid=a57edb72-7a79-43db-9fd5-413cf3bd723c; fbm_421039428061656=base_domain=.banhang.shopee.vn; ' +
      'SPC_T_F=1; __utmc=20759802; _med=PCPush; __utma=20759802.671433057.1552274818.1559122950.1559297004.8; ' +
      '__utmz=20759802.1559297004.8.5.utmcsr=banhang.shopee.vn|utmccn=(referral)|utmcmd=referral|utmcct=/portal/notification/order-updates; ' +
      'SPC_SC_SA_TK=; UYOMAPJWEMDGJ=; SPC_SC_SA_UD=; SPC_CDS=b51b404c-f238-42d2-8e9d-789b70cf12b4; ' +
      'root_csrftoken=1a4b5ca4-172c-42eb-b3c2-0bb21bfc231a; SPC_SI=mm72nkh9z2g0jdzuggazxpzng6mgwy57; ' +
      '_gid=GA1.2.2071082977.1559540190; SPC_SC_TK=961e08968c5eaed8ce0ef03ac4e64758; SPC_EC="P1onapFtrjAOW+eaGscY01jnfMGG3/tfYH1bWILXhWJZ/49YQm' +
      'YQyZvXxYstbyZv1fnUXEmjUmGd71TbGg4VAwdJsJS3GUZFkA7Ywg8ZJxXL4vW9PNi7ltpPTqwlp7Dh7DaNtlhpjQExjmbCVLJ7vtcsD158BcwRIp+65QFvTGs="; ' +
      'SPC_SC_UD=129443505; SPC_U=129443505; SPC_T_IV="MBTFRlrork9WkvsawzVsKQ=="; SPC_T_ID="kKgevumGZZhMNH4WPnQ7ApUsaUcedJMIFzCWEubzpai' +
      'oOfU91bJ8FOiJAhk04Nv1Dj19DemhjBTKfGH3lA9HZPUvAhVPTCdDOkUdsF5Y4bU="';
    const cookie = request.cookie(cookieStr);
    const urlGet: string = `https://banhang.shopee.vn/api/v3/product/page_product_list/?
    SPC_CDS=b51b404c-f238-42d2-8e9d-789b70cf12b4&SPC_CDS_VER=2&page_number=1&page_size=50&list_type=`;
    return new Promise((resolve, reject) => {
      request(
        {
          url: urlGet,
          jar: true,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Cookie': cookie,
          },
        }, (error, response, body) => {
          if (error) {
            return reject(error);
          }
          resolve(body);
        });
    });
  }

  async boostShopeeProduct(productId: number) {
    const cookieStr = 'SPC_F=fT78PW05Bn84uZTYPwN20DLugwhn3Be5; SC_DFP=GaBPkp1dtaNDKQPe82LvRqx9mlhN9hbP; ' +
      '_gcl_au=1.1.1607562020.1552016994; _fbp=fb.1.1552016994677.1390032690; _ga=GA1.3.2098735566.1552017011; ' +
      '_ga=GA1.2.671433057.1552274818; cto_lwid=a57edb72-7a79-43db-9fd5-413cf3bd723c; fbm_421039428061656=base_domain=.banhang.shopee.vn; ' +
      'SPC_T_F=1; __utmc=20759802; _med=PCPush; __utma=20759802.671433057.1552274818.1559122950.1559297004.8; ' +
      '__utmz=20759802.1559297004.8.5.utmcsr=banhang.shopee.vn|utmccn=(referral)|utmcmd=referral|utmcct=/portal/notification/order-updates; ' +
      'SPC_SC_SA_TK=; UYOMAPJWEMDGJ=; SPC_SC_SA_UD=; SPC_CDS=b51b404c-f238-42d2-8e9d-789b70cf12b4; ' +
      'root_csrftoken=1a4b5ca4-172c-42eb-b3c2-0bb21bfc231a; SPC_SI=mm72nkh9z2g0jdzuggazxpzng6mgwy57; ' +
      '_gid=GA1.2.2071082977.1559540190; SPC_SC_TK=961e08968c5eaed8ce0ef03ac4e64758; SPC_EC="P1onapFtrjAOW+eaGscY01jnfMGG3/tfYH1bWILXhWJZ/49YQm' +
      'YQyZvXxYstbyZv1fnUXEmjUmGd71TbGg4VAwdJsJS3GUZFkA7Ywg8ZJxXL4vW9PNi7ltpPTqwlp7Dh7DaNtlhpjQExjmbCVLJ7vtcsD158BcwRIp+65QFvTGs="; ' +
      'SPC_SC_UD=129443505; SPC_U=129443505; SPC_T_IV="MBTFRlrork9WkvsawzVsKQ=="; SPC_T_ID="kKgevumGZZhMNH4WPnQ7ApUsaUcedJMIFzCWEubzpai' +
      'oOfU91bJ8FOiJAhk04Nv1Dj19DemhjBTKfGH3lA9HZPUvAhVPTCdDOkUdsF5Y4bU="';
    const urlBoost = `https://banhang.shopee.vn/api/v3/product/boost_product/?SPC_CDS=b51b404c-f238-42d2-8e9d-789b70cf12b4&SPC_CDS_VER=2`;
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: urlBoost,
          jar: true,
          body: JSON.stringify({id: productId}),
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'https://banhang.shopee.vn',
            'cookie': cookieStr,
          },
        },
        (error, response, body) => {
          if (error) {
            return reject(error);
          }
          resolve(body);
        });
    });
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async create(product: Product) {
    return await this.productRepository.save(product);
  }

  // async update(id: string) {
  //   return await this.productRepository.update
  // }

}
