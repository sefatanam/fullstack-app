import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ProductDto } from "@fullstack-app/api-model";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<ProductDto[]>(
      `${environment.backend_url}/products`
    );
  }

  addOrUpdate(product: ProductDto){
    if(!product.id){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete product.id;
      return this.createProduct(product)
    }else{
      return  this.updateProduct(product)
    }
  }
  createProduct(product: ProductDto) {
    return this.httpClient.post<ProductDto>(`${environment.backend_url}/products`, product)
  }

  getProduct(id:string){
    return this.httpClient.get<ProductDto>(`${environment.backend_url}/products/${id}`);
  }

  /**
   * Update a product
   * @param productDto
   * It also supports patch update
   */
  updateProduct(product: ProductDto){
    return this.httpClient.patch<ProductDto>(`${environment.backend_url}/products/${product.id}`, product)
  }

  deleteProduct(id:string){
    return this.httpClient.delete(`${environment.backend_url}/products/${id}`)
  }
}
