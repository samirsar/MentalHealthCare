#include<stdio.h>
#define BIGGEST(x,y,z) ((x>y&&x>z)?printf("biggest is %d\n",x):(y>x&&y>z)?printf("biggest is %d\n",y):(z>x&&z>y)?printf("biggest is %d\n",z):printf(" sab same hai"))
int main()
{
    int a,b,c;

    printf("enter three number\n");
    scanf("%d%d%d",&a,&b,&c);
    BIGGEST(a,b,c);
    /*if(a>b&&a>c)
        printf("biggest is %d\n",a);
     else if(b>a&&b>c)
        printf("biggest is %d\n",b);
    else if(c>a&&c>b)
        printf("biggest is %d\n",c);
        else
            printf(" sab same hai");*/
    return 0;

}
