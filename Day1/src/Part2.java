import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Part2 {

    public static void main(String[] args) {
        List<Integer> leftList = new ArrayList<>();
        List<Integer> rightList = new ArrayList<>();

        int score = 0;

        /*
         * Read in the lists
         */
        try {
            //File inputFile = new File("src/TestData.txt");
            File inputFile = new File("src/input.txt");
            Scanner myReader = new Scanner(inputFile);

            while (myReader.hasNextLine()) {

                String line = myReader.nextLine();//read in the next line

                String[] numbers = line.split("\\s+");//split into string array
                leftList.add(Integer.parseInt(numbers[0]));//add first one to left list and convert to int
                rightList.add(Integer.parseInt(numbers[1]));//add second one to right list and convert to int

            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        /*
         * Sort the lists
         */
        Collections.sort(leftList);
        Collections.sort(rightList);

        for (int i = 0; i < leftList.size(); i++) {
            int num = leftList.get(i);

            int appearances = 0;

            for(int value: rightList){
                if(num == value){
                    appearances++;
                }
            }

            int similarity = num * appearances;

            score += similarity;
        }

        System.out.println(score);
    }
}
