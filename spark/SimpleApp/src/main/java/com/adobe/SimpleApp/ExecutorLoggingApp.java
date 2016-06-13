package com.adobe.SimpleApp;

import org.apache.spark.Accumulator;
import org.apache.spark.api.java.*;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.PosixParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.Function;

import java.util.Arrays;

/**
 * Created by neeraj on 13/6/16.
 */
public class ExecutorLoggingApp {

    public static void main(String[] args) {
        Options options = new Options();
        options.addOption("f", true, "Enter file path");
        String logFile = "/home/neeraj/Softwares/spark-1.6.0/README.md";
        // // Should be some file on your system

        CommandLineParser parser = null;
        CommandLine cmd = null;

        parser = new PosixParser();
        try {
            cmd = parser.parse(options, args);
            if (cmd.hasOption("f")) {
                logFile = cmd.getOptionValue("f");
            }
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        SparkConf conf = new SparkConf().setAppName("Simple Application");
        conf.setMaster("local");
        JavaSparkContext sc = new JavaSparkContext(conf);
        JavaRDD<String> logData = sc.textFile(logFile).cache();
        Accumulator<Integer> accum = sc.accumulator(0);

        sc.parallelize(Arrays.asList(1, 2, 3, 4)).foreach(x -> accum.add(x));
        System.out.println("**************Value: " + accum.value() );
    }
}
