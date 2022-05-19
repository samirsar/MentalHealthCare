#include<stdio.h>
#define ARITH_MEAN(a,b) ((a+b)/2.0)
int main()
{
    int a,b;
    float armean;

    printf("enter two number \n");
    scanf("%d%d",&a,&b);
   // armean=(a+b)/2.0;
   armean=ARITH_MEAN(a,b);
    printf("arithmatic mean is =%f",armean);
    return 0;

}
