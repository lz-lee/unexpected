const _ = require('lodash');

const foo = {
  name: [
    {
      "op": "not_in",
      "value": [
        "呃呃呃",
        "123"
      ]
    },
    {
      "op": "in",
      "value": [
        "123",
        "222"
      ]
    }
  ],
  age: [
    {
      op: ">",
      value: 12
    }
  ],
  or: {
    start_with: {
      name: "张"
    },
    '>': {
      age: 12
    }
  },
  double: [
    {
      op: '==',
      value: 11.11
    }
  ]
}

const bar = {
   name: [
      {
          op: '==',
          value: 'test'
      }
   ],
   double: [
      {
          op: ">",
          value: 22.1
      }
   ],
   or:{
      start_with: {
        age: 12
      },
      '==': {
        double: 1.11
      }
    }
}

const boo = {
  "name": [
    {
      "op": "not_in",
      "value": [
        "呃呃呃",
        "123"
      ]
    },
    {
      "op": "in",
      "value": [
        "123",
        "222",
        "222",
        "333"
      ]
    }
  ],
  "age": [
    {
      "op": ">",
      "value": 12
    }
  ],
  "or": [
    {
      "start_with": {
        "name": "张"
      }
    }
  ],
  "double": [
    {
      "op": ">",
      "value": 22.1
    }
  ]
}
// 并集 union unionBy

// 交集 intersection intersectionBy
// const intersectionOp = _.intersectionBy(bar.name, foo.name, 'op');

// const result = _.mergeWith(foo.name, intersectionOp)
// console.log(JSON.stringify(_.intersectionBy(bar.name, foo.name, 'op')));
// console.log(JSON.stringify(result));
// 补集 xor xorBy
// const xorOp = _.xorBy(foo.name, bar.name, 'op');
// console.log('bb', JSON.stringify(xorOp));
// console.log('aa', JSON.stringify(_.intersectionBy(xorOp, bar.name, 'op')));


const addFilterData = (filter, targetValue) => {
  let result = {};

  if (_.isEmpty(filter)) {
    result = targetValue;
  } else {
    Object.keys(filter).forEach(v => {
      result[v] = filter[v];

      // 是否有相同字段名
      if (targetValue[v]) {
        const originValue = filter[v];
        const newValue = targetValue[v];

        if (v === 'or') {
          Object.entries(originValue).forEach(([key, val]) => {
            result[v][key] = val;
            if (newValue[key]) {
              result[v] = {
                [key]: {...val, ...newValue[key]}
              }
            }
          });
          Object.entries(newValue).forEach(([key, val]) => {
            if (!result[v][key]) {
              result[v][key] = val;
            }
          });
        } else {
          // 交集 相同操作符
          // const intersectionOp = _.intersectionBy(newValue, originValue, 'op');
          // 先和originValue补集再与newValue交集，求出新操作符的值
          const xorOp = _.xorBy(originValue, newValue, 'op');
          // 新操作符
          const newOp = _.intersectionBy(xorOp, newValue, 'op');

          // result[v] = originValue.map(k => {
          //     const { op, value } = k;
          //     const $intersectionOp = intersectionOp.find(n => n.op === op);
          //     if ($intersectionOp) {
          //       const $value = $intersectionOp.value;

          //       return {
          //         op,
          //         value: Array.isArray($value) ? value.concat($value) : $value
          //       };
          //     }
          //     return k;
          // });

          result[v] = filter[v].concat(newOp);
        }
      }

    });
    Object.keys(targetValue).forEach(v => {
      if (!result[v]) {
        result[v] = targetValue[v];
      }
    });
  }

  return result;
};

const result = addFilterData(foo, bar);

console.log(JSON.stringify(result));

// const deleteFilterData = (filter, targetValue) => {
//   let result = {};
//   Object.keys(filter).forEach(v => {
//     const originValue = filter[v];
//     const deleteValue = targetValue[v];

//   });
// }