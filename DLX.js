var dlx={dlx_cover:function(r)
{
   r.right.left=r.left,r.left.right=r.right;
   for (var l=r.down;l!=r;l=l.down)
      for (var t=l.right;t!=l;t=t.right)
         t.down.up=t.up,
         t.up.down=t.down,
         t.column.size--
      },
      dlx_uncover:function(r) {
         for (var l=r.up;l!=r;l=l.up)
            for (var t=l.left;t!=l;t=t.left)
               t.column.size++,
               t.down.up=t,
               t.up.down=t;
               r.right.left=r,
               r.left.right=r
      },
      dlx_search:function (r,l,t,e,o) {
         var n=this;
         if(r.right==r)
            return e.push(l.slice(0)),
            e.length>=o?e:null;
         for (var f=null,i=99999,h=r.right;h!=r;h=h.right)
         {
            if(0==h.size)
               return null;
            h.size<i&&(i=h.size,f=h)
         }
         n.dlx_cover(f);
         for (var u=f.down;u!=f;u=u.down) {
            l[t]=u.row;
            for(var h=u.right;h!=u;h=h.right)
               n.dlx_cover(h.column);
            var i=n.dlx_search(r,l,t+1,e,o);
            if(null!=i)
               return i;
            for(var h=u.left;h!=u;h=h.left)
               n.dlx_uncover(h.column)}return n.dlx_uncover(f),null},dlx_solve:function(r,l,t){for(var e=new Array(r[0].length),o=e.length,n=0;n<o;n++)e[n]={};for(var n=0;n<o;n++)e[n].index=n,e[n].up=e[n],e[n].down=e[n],n>=l?(n-1>=l&&(e[n].left=e[n-1]),n+1<o&&(e[n].right=e[n+1])):(e[n].left=e[n],e[n].right=e[n]),e[n].size=0;for(var n=0,f=r.length;n<f;n++)for(var i=null,h=0,u=r[n].length;h<u;h++)if(r[n][h]){var a={};a.row=n,a.column=e[h],a.up=e[h].up,a.down=e[h],i?(a.left=i,a.right=i.right,i.right.left=a,i.right=a):(a.left=a,a.right=a),e[h].up.down=a,e[h].up=a,e[h].size++,i=a}var v={},s=[];return v.right=e[l],v.left=e[o-1],e[l].left=v,e[o-1].right=v,this.dlx_search(v,[],0,s,t),s},solve:function(r){for(var l=[],t=[],e=0;e<9;e++)for(var o=0;o<9;o++){var n=r[e][o]-1;if(n>=0){var f=new Array(324);f[9*e+o]=1,f[81+9*e+n]=1,f[162+9*o+n]=1,f[243+9*(3*Math.floor(e/3)+Math.floor(o/3))+n]=1,l.push(f),t.push({row:e,col:o,n:n+1})}else for(var i=0;i<9;i++){var f=new Array(324);f[9*e+o]=1,f[81+9*e+i]=1,f[162+9*o+i]=1,f[243+9*(3*Math.floor(e/3)+Math.floor(o/3))+i]=1,l.push(f),t.push({row:e,col:o,n:i+1})}}var h=this.dlx_solve(l,0,2);if(h.length>0){for(var u=h[0],e=0;e<u.length;e++)r[t[u[e]].row][t[u[e]].col]=t[u[e]].n;return h.length}return 0}};self.addEventListener("message",function(r){var l=dlx.solve(r.data);self.postMessage(l)},!1);