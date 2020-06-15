# traderUI
trader部分前端

### 持久化存储

1. 使用redux存储用户信息,刷新后信息不丢失
2. stompjs实现点对点实时通信，结合组件的生命周期进行ws的订阅及取消取消订阅
3. 使用ts来进行规范化前端开发

### CI/CD
基于github和droneCI的持续集成、持续部署，同时设置权限控制本org的成员可以使用

### istio
进行流量管理，基于istio-ingressgateway对进入的流量进行过滤及分发，根据url区分流量分发到的服务。