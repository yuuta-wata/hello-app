import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';
// スキーマ
@Resolver()
class HelloResolver {
  // クエリhelloを作成
  @Query(() => String)
  async hello() {
    return 'Hello,World¡';
  }
}

const main = async () => {
  // スキーマをビルド
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });
  // インスタンス作成（スキーマを代入している）
  const apolloServer = new ApolloServer({ schema });
  // インスタンス作成
  const app = Express();
  // アポロサーバーにExpressを使う
  apolloServer.applyMiddleware({ app });
  // 4000ポートで起動　4000じゃなくてもいい
  app.listen(4000, () => {
    console.log('サーバー起動🚀 http://localhost:4000/graphql');
  });
};

main();
