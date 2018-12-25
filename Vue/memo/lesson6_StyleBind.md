# Style & Disabled Binding

1. 概要   
  HTML要素のインラインスタイルの操作が可能。   
  Vueインスタンスが保持しているスタイル情報等を対象のHTML要素のインラインスタイルに適用することが可能。
。

2. 基本的な書き方    
  -　HTML側   
  対象となるHTML要素の属性にv-bind:style(または:style)を追加する。  
  ""内部にはオブジェクト形式**({ CSSプロパティ : 値(Vueインスタンスのデータなど)})**で指定。  
  **CSSプロパティはキャメルケースとケバブケースで指定可能(ケバブケースは''でくくること)**
        <p v-bind:style="{fontSize: vueFont, color: vueColor}">
        もしくは
        <p v-bind:style="{'font-size': vueFont}">

- JS側   
適用したいCSS情報をdataに追加    
        new Vue({
          data: {
            vueFont: '32px',
            vueColor: 'red',
          },
        });

3. さらに  
  3-1. 様々な指定方法
    - :styleにvueインスタンスのオブジェクトをそのまま渡すことも可能
      - HTML側
            <p :style="vueStyleObj">

      - JS側  
            new Vue({
              data: {
                vueStyleObj: {
                  fontSize: '13px',
                  color: 'red',
                },
              },
            });

    - 複数のオブジェクトを渡すことも可能   
    :styleに配列形式で指定  
      - HTML側   
            <p :style="[fontObj, shapeObj]">
      - JS側  
            new Vue({
              data: {
                fontObj: {
                  fontSize: '15px';
                  fontColor: 'red'
                },
                shapeObj: {
                  height: '15px',
                  width: '15px',
                  marginBottom: '15px',
                }
              }
            });

  3-2. v-bind:disabled属性   
  v-bind:disabled(:disabled)属性を付与したHTML要素は、""内部がtrueの時、その要素はインラインスタイルのdisabledが付与される。
    - HTML側   
    以下はp要素をdisabledにする例
          <p :disable="!isClickable">

    - JS側   
          new Vue({
            data: {
              isClickable: false;
            }
          });
