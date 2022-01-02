# ZRPoke

Uma aplicação simples, constituida de front e backend dockerizados.
Para efeitos de demonstração o serviço está rodando em servidor dedicado,
com deploy realizado utilizando apenas docker, com um private registry.

Ambos os serviços foram colocados numa única imagem apenas para manter a simplicidade
do projeto, pois compartilham o mesmo ambiente NodeJS. Em caso de uso de outros serviços
como um banco de dados e/ou NGINX o ideal seria utilizar o docker-compose.
O frontend utiliza ainda o server de desenvolvimento do react-scripts, sem realizar a build.
Como já elucidei, apenas para efeitos de demonstração é suficiente.

[Confira aqui](http://ds1423.tmddedicated.com:3000)

**A pressa e o nervosismo são inimigos da qualidade e do raciocínio**
