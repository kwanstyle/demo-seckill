## Quick Start
As prerequisite, Docker is required since the cluster is running on docker-compose.

In .env, update the IP address of the host, as Kafka will need it for advertising.

To start the service, run the following command in the root directory of the repository.

```
docker-compose up
```

Initialization will handle the creation of database and related tables without sample data.

#### To add a product
Make a POST request to `localhost:8080/product` with url-encoded fields `name`, `price` and `description`.

#### To add inventory
Make a POST request to `localhost:8080/inventory` with url-encoded fields `product`(product id, returned from previous step) and `amount`.

#### To trigger the seckill
Make POST requests to `localhost:8080/seckill` (nginx gateway) or `localhost:8081` (direct) with url-encoded fields `product`(product id), `user` and `amount`.


## Design
TBD

## References

[一次模拟简单秒杀场景的实践 Docker + Nodejs + Kafka + Redis + MySQL](https://www.jianshu.com/p/c18e61d0726c)

[Docker - 通过容器部署Kafka环境教程（以及ZooKeeper）](https://www.hangge.com/blog/cache/detail_2791.html)

[我没有高并发项目经验，但是面试的时候经常被问到高并发、性能调优方面的问题，有什么办法可以解决吗？ - 艾小仙的回答 - 知乎](https://www.zhihu.com/question/421237964/answer/1699066805)

[《我们一起进大厂》系列-秒杀系统设计](https://juejin.cn/post/6844903999083151374)
