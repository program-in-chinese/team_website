import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class 二分查找空比较器 {
    public static void main (String args[]) throws Exception {
        List 列表 = Arrays.asList(new String[] {"昨天", "今天", "明天"});

        int 结果 = Collections.binarySearch(列表, "明天", null);
        if (结果 != 2)
            throw new Exception("Result: " + 结果);
    }
}